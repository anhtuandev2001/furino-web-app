function checkTokenExistence(navigateLogin?: boolean) {
  try {
    const cookies = document.cookie.split(';');

    let tokenExists = '';
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('token=')) {
        tokenExists = cookie;
        break;
      }
    }

    console.log('navigateLogin', navigateLogin);
    

    if (!tokenExists && navigateLogin) {
      window.location.href = '/login';
      return;
    }

    return tokenExists.split('=')[1];
  } catch (error) {
    throw new Error('Error fetching token');
  }
}

export default checkTokenExistence;
