generateRandomId() {
    const idLength = 8;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    while (id.length < idLength) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      id += randomCharacter;
    }

    return id;
  }

  