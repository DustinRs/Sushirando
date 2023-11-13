function sendMail(event) {
    event.preventDefault();
    const data = new FormData(event.target);
  
    fetch("https://formspree.io/f/xknlkrnz", {
      method: "POST",
      body: new FormData(event.target),
      headers: {
        Accept: "application/json",
      },
    })
      .then(() => {
        window.open('./index.html');
      })
      .catch((error) => {
        console.log(error);
      });
  }