//loading delay
document.querySelector("div.container-fluid").style = "display: none";

setTimeout(function () { 
    document.querySelector("div.loading").style = "display: none";
    
    document.querySelector("div.container-fluid").style = "display: block";
}, 3000);

// scrolling subtle animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));