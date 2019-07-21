class Timer
{
    constructor()
    {
        this.date_begin = null;
        this.interval_id = null;
        this.is_running = false;
    }

    update()
    {  
        console.log("update");
        let date_elapsed = new Date(Date.now() - this.date_begin);
        let timer_text = document.getElementsByClassName("timer")[0];
        timer_text.textContent = `${date_elapsed.getHours() > 0 ? "" : date_elapsed.getHours()}:
                             ${date_elapsed.getMinutes()}:
                             ${date_elapsed.getSeconds()}`;              
    }


    startTimer(event)
    {
        this.is_running = true;
        this.date_begin = Date.now();
        this.interval_id = window.setInterval(update, 1000);
        document.getElementById('focus_button').hidden = true;
        document.getElementById('stop_button').hidden = false;
        console.log(this.interval_id);
    }

    stopTimer(event)
    {
        this.is_running = false;
        console.log(`clear : ${this.interval_id}`);
        window.clearInterval(this.interval_id);
        document.getElementById('focus_button').hidden = false;
        document.getElementById('stop_button').hidden = true;        
        //writeDatabase();
    }
}

let timer = new Timer();
document.getElementById('focus_button').addEventListener('click', timer.startTimer);
document.getElementById('stop_button').addEventListener('click', timer.stopTimer);