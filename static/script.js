class Timer
{
    constructor()
    {
        this.date_begin = null //time in ms.
        this.interval_id = null
    }

    formatNumbers(number)
    {
        if (number === 0) return "00"
        if (number > 0 && number < 10) return `0${number}`
        return `${number}`   
    }

    update()
    {  
        let date_elapsed = new Date(Date.now() - this.date_begin)
        let timer_text = document.getElementsByClassName("timer")[0]
        timer_text.textContent = `${date_elapsed.getHours() > 0 ? "" : this.formatNumbers(date_elapsed.getHours())}
                             ${this.formatNumbers(date_elapsed.getMinutes())}:
                             ${this.formatNumbers(date_elapsed.getSeconds())}`            
    }

    startTimer(event)
    {
        this.date_begin = Date.now()
        this.update()
        this.interval_id = window.setInterval(function(_this) {_this.update()}, 1000, this)
        document.getElementById('focus_button').hidden = true
        document.getElementById('stop_button').hidden = false
    }

    stopTimer(event)
    {
        window.clearInterval(this.interval_id)
        document.getElementById('focus_button').hidden = false
        document.getElementById('stop_button').hidden = true;       
    }
}

let timer = new Timer();
document.getElementById('focus_button').addEventListener('click', function() {timer.startTimer()})
document.getElementById('stop_button').addEventListener('click', function() {timer.stopTimer()})   