// Create the function
export function AjoutLibrary(urlOfTheLibrary) {
  const script = document.createElement("script");
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

export const tabTmp = [
  "/assets/js/ready.min.js",
  "/logins/js/main.js",
];

export const libraryList = [
  "/assets/js/common/jquery.3.2.1.min.js",
  "/assets/js/common/popper.min.js",
  "/assets/js/common/bootstrap.min.js",
  "/assets/js/common/bootstrap-toggle.min.js",
  "/assets/js/common/jquery.scrollbar.min.js",

  "/assets/js/template/ready.min.js",

  "/assets/js/logins/tilt.jquery.min.js",
  "/assets/js/logins/script.js",
];
