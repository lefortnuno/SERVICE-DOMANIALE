// Create the function
export function AjoutLibrary(urlOfTheLibrary) {
  const script = document.createElement("script");
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

export const tabTmp = [
  "/assets/js/plugin/jquery-mapael/jquery.mapael.min.js",
  "/assets/js/plugin/jquery-mapael/maps/world_countries.min.js",
  "/assets/js/demo.js",
];

export const libraryList = [
  "/assets/js/core/jquery.3.2.1.min.js",
  "/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js",
  "/assets/js/core/popper.min.js",
  "/assets/js/core/bootstrap.min.js",
  "/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
  "/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js",
  "/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
  "/assets/js/ready.min.js",
  "/logins/vendor/select2/select2.min.js",
  "/logins/vendor/tilt/tilt.jquery.min.js",
  "/logins/js/main.js",
];
