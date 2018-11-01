const getWSUrl = () => {
  const loc = window.location;
  let newUrl;
  if (loc.protocol === 'https:') {
    newUrl = 'wss:';
  } else {
    newUrl = 'ws:';
  }
  newUrl += `//${loc.host}`;
  return newUrl;
};

let baseUrl = '/api';
let wsUrl = `${getWSUrl()}/api`;

const fetchItems = async (url) => {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const result = await response.json();
  return result.items || [];
};

const deleteItem = async (url, name) => {
  const response = await fetch(url, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return name;
};

const webSocket = (action, url) => {
  const ws = new WebSocket(wsUrl + url);
  let active = false;
  ws.onmessage = () => {
    if (!active) {
      active = true;
      setTimeout(() => {
        active = false;
        action();
      }, 1000);
    }
  };
  return ws;
};

const dataService = {
  mobileClients: () => fetchItems(`${baseUrl}/mobileclients`),
  serviceInstances: () => fetchItems(`${baseUrl}/serviceinstances`),
  builds: () => fetchItems(`${baseUrl}/builds`),
  buildConfigs: () => fetchItems(`${baseUrl}/buildconfigs`),
  createApp: async (app) => {
    const response = await fetch(`${baseUrl}/mobileclients`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(app),
    });
    if (!response.ok) {
      const msg = await response.text();
      throw Error(`${response.statusText}: ${msg}`);
    }
    return response.json();
  },
  updateApp: async (id, app) => {
    const response = await fetch(`${baseUrl}/mobileclients/${id}`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(app),
    });
    if (!response.ok) {
      const msg = await response.text();
      throw Error(`${response.statusText}: ${msg}`);
    }
    return response.json();
  },  
  mobileApp: async appName => {
    const response = await fetch(`${baseUrl}/mobileclients/${appName}`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    if (!response.ok) {
      const msg = await response.text();
      throw Error(`${response.statusText}: ${msg}`);
    }
    return response.json();
  },
  deleteApp: name => deleteItem(`${baseUrl}/mobileclients/${name}`, name),
  triggerBuild: async (name) => {
    const response = await fetch(`${baseUrl}/buildconfigs/${name}/instantiate`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  },
  deleteBuildConfig: name => deleteItem(`${baseUrl}/buildconfigs/${name}`, name),
  watchBuilds: action => webSocket(action, '/builds/watch'),
  watchApps: action => webSocket(action, '/mobileclients/watch'),
  watchBuildConfigs: action => webSocket(action, '/buildconfigs/watch'),
  watchServices: action => webSocket(action, '/serviceinstances/watch'),
  generateDownloadURL: async (name) => {
    const response = await fetch(`${baseUrl}/builds/${name}/gendownloadurl`, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
  },
  fetchUser: async () => {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const user = await response.json();
    return user;
  }
};

export default dataService;
