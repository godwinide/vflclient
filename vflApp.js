const express = require("express");
const app = express();

const puppeteer = require("puppeteer");

(async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://vsagent.bet9ja.com/bet9ja-cashier-league/login/");
    
        page.evaluate(async()=> {
                let username = "cashier18391-01";
                let pass = "18473272";
                let inputU = document.querySelectorAll("input")[0];
                let inputP = document.querySelectorAll("input")[1];
                let inputL = document.querySelector("a.btn");
                inputU.value = username;
                inputP.value = pass;
                inputL.click();    
        });

        await page.waitForNavigation({waitUntil: "networkidle0"});

        setTimeout(async ()=>{          
            page.evaluate(async() => {
                document.querySelector(".button-admin-title").click();
                // open terminal
                setTimeout(()=>{
                  url1 = "https://vsagent.bet9ja.com/shopadmin/history_view/league.php"
                  async function getResults() {
                    try{
                      const request = new Request(url1, {
                        headers: new Headers({
                            "Host": "vsagent.bet9ja.com",
                            "X-Requested-With": "XMLHttpRequest"
                        })
                      })
                    
                      const req = await fetch(request);
                      const res = await req.text();
                      const sreq = await fetch("http://localhost:9090/api/history/update", {
                        headers:{
                          "content-type": "text/plain"
                        },
                        method: "POST",
                        body: res
                      })
                      const sres = await sreq.json();
                      setTimeout(getResults, 180000);
                      
                    }catch(err){
                      console.log(err)
                      setTimeout(getResults, 180000);
                    
                    }
                  }
                  
                  getResults();
                },10000)
            })
        },15000)
})()

const PORT = 9091;
app.listen(PORT, console.log("server started on port"+PORT));
