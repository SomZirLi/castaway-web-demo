document.addEventListener('DOMContentLoaded', function () {
    fetch('data/plates.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.platesMusic');
            data.forEach(item => {
                const li = document.createElement('li')
                li.innerHTML = `
                <img src="${item.image}" alt="">
                <div class="right">
                  <div class="buttonGray"><h6>${item.category}</h6></div>
                  <h6 class="textColorBlue">${item.episode}</h6>
                  <h4>${item.title}</h4>
                  <p><h6>${item.description}</h6></p>
                  <div><button class="buttonBlue"><a href="${item.url}"><h6>View Episode Details</h6></a></button></div>
                </div>
              `;
              container.appendChild(li);
            });
        });
});