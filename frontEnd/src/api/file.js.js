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
  "/js/common/jquery.3.2.1.min.js",
  "/js/common/popper.min.js",
  "/js/common/bootstrap.min.js",
  "/js/common/bootstrap-toggle.min.js",
  "/js/common/jquery.scrollbar.min.js",

  "/js/template/ready.min.js",

  "/js/logins/tilt.jquery.min.js",
  "/js/logins/script.js",
];
