class Timer
{
    constructor()
    {
        this.date_started // Date object
        this.time_focused // Seconds
        this.interval_id // id returned by setInterval
    }

    formatNumbers(number)
    {
        if (number === 0) return "00"
        if (number > 0 && number < 10) return `0${number}`
        return `${number}`   
    }

    formatDate(d)
    {
        let formatted_month = this.formatNumbers(d.getMonth() + 1) //getMonth returns 0-based month.
        let formatted_day = this.formatNumbers(d.getDate())

        return `${d.getFullYear()}-${formatted_month}-${formatted_day}`
    }

    formatTime(d)
    {
        //HH:MM:SS.mmm
        let formatted_hour = this.formatNumbers(d.getHours())
        let formatted_minute = this.formatNumbers(d.getMinutes())
        let formatted_second = this.formatNumbers(d.getSeconds())      

        return `${formatted_hour}:${formatted_minute}:${formatted_second}.${d.getMilliseconds()}`
    }

    updateTimer()
    {  
        let date_elapsed = new Date(Date.now() - this.date_started)
        let ms_elapsed = date_elapsed.getTime()

        let leftover_time = ms_elapsed

        let h = Math.floor(ms_elapsed / (1000*60*60))
        leftover_time -= 1000*60*60*h
        
        let m = Math.floor(leftover_time / (1000*60))
        leftover_time -= 1000*60*m

        let s = Math.floor(leftover_time / 1000)

        // Stop updating when it reaches 24hr.
        if (h>23) {h=23; m=59; s=59}

        this.time_focused = (60*60*h) + (60*m) + s 

        let timer_text = document.getElementsByClassName("timer")[0]
        timer_text.textContent = `${h <= 0 ? "" : h}${h <= 0 ? "" : ":"}${this.formatNumbers(m)}:${this.formatNumbers(s)}`
    }

    startTimer(event)
    {
        this.date_started = new Date()
        this.time_focused = 0
        
        this.updateTimer()
        this.interval_id = window.setInterval(function(_this) {_this.updateTimer()}, 1000, this)
        document.getElementById('focus_button').hidden = true
        document.getElementById('stop_button').hidden = false
    }

    stopTimer(event)
    {
        window.clearInterval(this.interval_id)

        this.updateDatabase(true)
        document.getElementById('focus_button').hidden = false
        document.getElementById('stop_button').hidden = true       
    }

    updateDatabase(dev)
    {
        // Create a new XHR object
        let xhr = new XMLHttpRequest()

        // Open a request to the db api
        xhr.open("POST", "/db", true) //the last argument determines whether this request is done in async.

        // Set the header. This function can only be called after open() happens
        xhr.setRequestHeader("Content-Type", "application/json")

        // Add a callback for debug
        if (dev) xhr.addEventListener('readystatechange', function() {if (this.readyState === XMLHttpRequest.DONE) console.log(this.response)})

        let d = this.date_started

        let json = {
            'date_started': this.formatDate(d),
            'time_started': this.formatTime(d),
            'time_focused': this.time_focused
        }

        if (dev) {json.dev = ''; console.log(json)}

        xhr.send(JSON.stringify(json))
    }
}

let timer = new Timer();
document.getElementById('focus_button').addEventListener('click', function() {timer.startTimer()})
document.getElementById('stop_button').addEventListener('click', function() {timer.stopTimer()})