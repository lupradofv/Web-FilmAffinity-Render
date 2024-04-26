// NO TOCAR
(function(global) {
  const msw = MockServiceWorker;
  const users = read() || {};

  function save() { global.localStorage && global.localStorage.setItem('users', JSON.stringify(users)); }
  function read() { return global.localStorage && JSON.parse(global.localStorage.getItem('users')); }

  function isAuthenticated(cookies) {
    const user = cookies.sessionId && Object.values(users).find(u => u.sessionId === cookies.sessionId);
    if (user) { return user; }
    throw new msw.HttpResponse('No hay sesión iniciada', { status: 401 });
  }

  async function readJson(request) {
    try { 
      return await request.json(); 
    } catch(e) { 
      throw new msw.HttpResponse('Cuerpo petición incorrecto', { status: 400 });
    }
  }

  const handlers = [
    msw.http.post('/api/users/login', async ({ request }) => {
      await msw.delay(1000);
      const {email, password} = await readJson(request);
      if (!users[email] || users[email].password !== password) {
        return new msw.HttpResponse('Crendeciales incorrectas', { status: 401 });
      }
      users[email].sessionId = users[email].sessionId || global.crypto.randomUUID();
      save();
      return new msw.HttpResponse(null, {
        status: 201,
        headers: {'Set-Cookie': 'sessionId=' + users[email].sessionId}
      });
    }),
    msw.http.delete('/api/users/logout', async ({ cookies }) => {
      await msw.delay(1000);
      const user = isAuthenticated(cookies);
      delete user.sessionId;
      save();
      return new msw.HttpResponse(null, {
        status: 204, headers: {'Set-Cookie': 'sessionId=deleted; Max-Age=0'}
      });
    }),
    msw.http.post('/api/users', async ({ request }) => {
      await msw.delay(1000);
      const newUser = await readJson(request);
      if (!newUser.email || !newUser.password) {
        return new msw.HttpResponse('Faltan campos obligatorios', { status: 400 });
      }
      if (users[newUser.email]) {
        return new msw.HttpResponse('Email ya registrado', { status: 409 });
      }
      users[newUser.email] = newUser;
      save();
      return new msw.HttpResponse(null, { status: 201 });
    }),
    msw.http.get('/api/users/me', async ({ cookies }) => {
      await msw.delay(1000);
      const user = isAuthenticated(cookies);
      return msw.HttpResponse.json(user);
    }),
    msw.http.put('/api/users/me', async ({ request, cookies }) => {
      await msw.delay(1000);
      let user = isAuthenticated(cookies);
      users[user.email] = {...user, ...await readJson(request), email: user.email}
      save();
      return msw.HttpResponse.json(users[user.email]);
    }),
    msw.http.delete('/api/users/me', async ({ cookies }) => {
      await msw.delay(1000);
      const user = isAuthenticated(cookies);
      delete users[user.email];
      save();
      return new msw.HttpResponse(null, {
        status: 204, headers: {'Set-Cookie': 'sessionId=deleted; Max-Age=0'}
      });
    }),
  ];

  const started = msw.setupWorker(...handlers).start({onUnhandledRequest: 'bypass', serviceWorker: {url: "/_backend-server.js"}});
  const { fetch: originalFetch } = window;
  global.fetch = async function fetch() {
    await started;
    return await originalFetch(...arguments);
  };
})(this);
