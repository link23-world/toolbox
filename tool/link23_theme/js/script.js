// ---------
// Variables
// ---------
// Current version number
const version = "0.1.0";
// Full name of the tool
const fullName = "link23 Toolbox for Genomic Equity";
// Short name of the tool for page titles
const shortName = "link23 Toolbox";
// GitHub repository
const repo = "toolbox";
// Zenodo DOI when you have it
const zenodo = "<doi_1>/zenodo.<doi_2>";

// ----------------
// Populate fields
// ----------------
$(document).ready(function () {
  $("#header").load("link23_theme/shared/header.html");
  $("#footer").load("link23_theme/shared/footer.html");
});

$(document).ajaxStop(function () {
  const today = new Date();
  const year = today.getFullYear();

  $(".fullname").text(fullName);
  $(".navbar-brand").text(shortName);
  $(".navbar-brand").attr("href", `/tool/index.html`);
  $(".btn-version").text("v" + version);
  $(".btn-version").attr("href", `https://github.com/link23-world/${repo}/blob/main/NEWS.md`);
  $(".repo").attr("href", `https://github.com/link23-world/${repo}`);
  $(".news").attr("href", `https://github.com/link23-world/${repo}/blob/main/NEWS.md`);
  $(".contributors").attr("href", `https://github.com/link23-world/${repo}#contributors`);
  $(".license").attr("href", `https://github.com/link23-world/${repo}/blob/main/LICENSE.md`);
  $(".issue").attr("href", `https://github.com/link23-world/${repo}/issues`);
  $(".discussion").attr("href", `https://github.com/link23-world/${repo}/discussions`);
  $(".citation").text(`The link23 Community. (${year}). ${fullName} (Version ${version}) [Computer software]. https://doi.org/${zenodo}.`);
});