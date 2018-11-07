let jobs = document.querySelectorAll('.main__job-container');
let barberJob = document.querySelector('.barber-job');
let adminJob = document.querySelector('.admin-job');

barberJob.addEventListener('click', function() {
    jobs[1].classList.remove('main__job-container--active');
    jobs[0].classList.add('main__job-container--active');

    adminJob.classList.remove('job-list__item--active');
    barberJob.classList.add('job-list__item--active');
    
})

adminJob.addEventListener('click', function() {
    jobs[0].classList.remove('main__job-container--active');
    jobs[1].classList.add('main__job-container--active');

    barberJob.classList.remove('job-list__item--active');
    adminJob.classList.add('job-list__item--active');
})

console.log(jobs);
console.log(barberJob);
console.log(adminJob);