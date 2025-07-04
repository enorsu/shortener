const btn = document.getElementById("copy");
btn.addEventListener("click", function() {
    navigator.clipboard.writeText("https://vi.dy.fi/" + btn.dataset.a)
    alert("copied the url")
})