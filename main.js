htmli = document.getElementById("disp");

$.ajax({
    type: "POST",
    url: "/filemanager.py",
    data: { param: "none" },
    success: htmli.innerHTML = response
});