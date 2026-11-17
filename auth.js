async function requireLogin(){
  const { data } = await sb.auth.getSession();
  if (!data.session) location.href = "login.html";
}

async function logout(){
  await sb.auth.signOut();
  location.href = "login.html";
}

function goBack(){
  if (history.length > 1) history.back();
  else location.href = "index.html";
}

// Make the Back, Home and Log out buttons work reliably on every page
document.querySelectorAll(".nav a").forEach(a => {
  const t = a.textContent;
  if (t.includes("Back")) {
    a.setAttribute("href", "#");
    a.onclick = e => { e.preventDefault(); goBack(); };
  } else if (t.includes("Log out")) {
    a.setAttribute("href", "#");
    a.onclick = e => { e.preventDefault(); logout(); };
  } else if (t.includes("Home")) {
    a.setAttribute("href", "index.html");
    a.onclick = e => { e.preventDefault(); location.href = "index.html"; };
  }
});

requireLogin();