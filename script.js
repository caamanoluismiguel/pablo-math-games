document.addEventListener("DOMContentLoaded", function () {
  // Fetch the external SVG file (world.svg) and inject it into the page.
  fetch("world.svg")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((svgText) => {
      const mapContainer = document.getElementById("mapContainer");
      mapContainer.innerHTML = svgText;

      // Once the SVG is injected, select all country paths.
      // (Assuming each country path has the class "country".)
      // If your SVG does not have that class, you can select all <path> elements.
      let countries = mapContainer.querySelectorAll("path.country");
      if (countries.length === 0) {
        // Fallback: select all path elements
        countries = mapContainer.querySelectorAll("path");
      }

      // Mapping of country ISO codes (as used in the SVG id attributes)
      // to their capitals. Extend this list as needed.
      const capitals = {
        AFG: "Kabul",
        ALB: "Tirana",
        DZA: "Algiers",
        AND: "Andorra la Vella",
        AGO: "Luanda",
        ARG: "Buenos Aires",
        AUS: "Canberra",
        BRA: "Brasília",
        CAN: "Ottawa",
        CHN: "Beijing",
        DEU: "Berlin",
        FRA: "Paris",
        IND: "New Delhi",
        MEX: "Mexico City",
        RUS: "Moscow",
        ZAF: "Pretoria",
        USA: "Washington, D.C.",
        CAF: "Bangui" // Central African Republic
        // Add more entries for all countries as needed.
      };

      // Attach click events to each country path.
      countries.forEach((country) => {
        country.addEventListener("click", function () {
          // Change the fill color to a random color.
          this.style.fill = randomColor();

          // Retrieve the country ISO code from the element's id.
          const countryId = this.id;

          // Look up the capital for this country.
          const capital = capitals[countryId] || "Capital not available";

          // Retrieve the country name.
          // If your SVG uses a <title> tag inside each path, that will be used.
          let countryName = this.getAttribute("title");
          if (!countryName) {
            // Alternatively, check for a nested <title> element.
            const titleElem = this.querySelector("title");
            countryName = titleElem ? titleElem.textContent : countryId;
          }

          // Update the info box with the country name and its capital.
          document.getElementById("info").innerHTML =
            `The capital of <strong>${countryName}</strong> is: <strong>${capital}</strong>`;
        });
      });
    })
    .catch((error) => {
      console.error("Error loading the SVG map:", error);
    });

  // Helper function to generate a random hex color.
  function randomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    );
  }
});
