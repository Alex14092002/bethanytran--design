var button = document.querySelector(".ham-button");
var slide = document.querySelector(".nav-items");

button.addEventListener("click", () => {
  slide.classList.toggle("display");
  button.children[0].classList.toggle("toggle1");
  button.children[1].classList.toggle("toggle2");
  button.children[2].classList.toggle("toggle3");
});

//render giao dien trang chu
fetch("https://bethany-eb426-default-rtdb.firebaseio.com/.json")
  .then((response) => response.json())
  .then((data) => {
    //get id to param url
    const currentUrl = window.location.href;

    const urlParams = new URLSearchParams(new URL(currentUrl).search);

    const id = urlParams.get("id");
    let brandDetails = {};

    for (const key in data.brands) {
      let arr = [];
      arr = Object.values(data.brands[key]);

      for (let j = 0; j < arr.length; j++) {
        console.log(arr[j].id === id);
        if (arr[j].id === id) {
          brandDetails = arr[j].detail;
          break;
        }
      }

      if (Object.keys(brandDetails).length !== 0) {
        break;
      }
    }

    const arrImage = Object.values(brandDetails.images);
    console.log(arrImage);

    //reder data ra ui
    const brandDetailElement = document.createElement("div");
    let contentBrand = `
    <div class="img-home-project">
      <img src="${arrImage[0].url}" alt="${arrImage[0].alt}" width="100%" />
    </div>
    <div class="name-project">
      <h3>${brandDetails.name}</h3>
    </div>
    <div class="content-project row">
      <table>
        <tr>
          <td class="hidden col-12 col-md-4"><p>Brief:</p></td>
          <td class="content-item col-12 col-md-8">
            <p>
            ${brandDetails.brief}
            </p>
          </td>
        </tr>
        <tr>
          <td class="hidden col-12 col-md-4"><p>Approach:</p></td>
          <td class="content-item col-12 col-md-8">
            <p>
            ${brandDetails.approach}
            </p>
          </td>
        </tr>
        <tr>
          <td class="hidden col-12 col-md-4"><p>Solution:</p></td>
          <td class="content-item col-12 col-md-8">
            <p>
            ${brandDetails.solution}
            </p>
          </td>
        </tr>
      </table>
    </div>`;

    for (let i = 1; i < arrImage.length; i++) {
      contentBrand += `
      <div class="img-item">
        <img src="${arrImage[i].url}" alt="${arrImage[i].url}" width="100%" />
      </div>`;
    }

    brandDetailElement.innerHTML = contentBrand;

    document
      .getElementById("brand-detail-container")
      .appendChild(brandDetailElement);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
