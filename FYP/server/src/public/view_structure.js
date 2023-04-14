//import { text } from "express"

var left_crtl = true
var width_crtl = true
var current_loop='290-301'
var highted=false

window.onload = function() { 
window.onresize = handleWindowSize;

document.getElementById("right window").checked = false;
document.getElementById("left window").checked = true;
document.getElementById("sync").checked=false;
document.getElementById("highlight").checked=false;
  
w =Number( window.innerWidth)

if(w<860){
 size_inital=400
 document.getElementById("left_label").textContent="up"
 document.getElementById("right_label").textContent="down"
}else{
  size_inital=598
  document.getElementById("left_label").textContent="left"
  document.getElementById("right_label").textContent="right"
}

        var JmolInfo = {
          width: size_inital,
          height: size_inital,
            //serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
            use: "HTML5",
            script: "load=1adg"
        }
      
        document.getElementById("appdiv1").innerHTML = Jmol.getAppletHtml(
            "jmolApplet0",
            JmolInfo
        );

        var JmolInfo = {
          width: size_inital,
          height: size_inital,
          //serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
          use: "HTML5",
          script: "load http://localhost:5123/public/OutputPDBS/PDBID_1ADG_CHAIN_A_BEG_290_END_301_PHITARGS_291_-90_292_-110_293_-64_294_-90_PSITARGS_291_122_292_-35_293_147_PHICONSTR_295_296_PSICONSTR_295_296_ITTR_10000.pdb"
      }
    
      document.getElementById("appdiv2").innerHTML = Jmol.getAppletHtml(
          "jmolApplet1",
          JmolInfo
      );

document.getElementById("third").innerHTML+=Jmol.jmolRadioGroup(jmolApplet0, [["set background white", "white", true],["set background black", "black"]])
document.getElementById("third").innerHTML+=Jmol.jmolBr(jmolApplet0)
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; cartoon only", "cartoon")
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; wireframe -0.25", "stick")
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; spacefill only;spacefill 23%;wireframe 0.15","ball&stick")
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; spacefill","Van der Waals")
document.getElementById("third").innerHTML+=Jmol.jmolBr(jmolApplet0)
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; color cpk", "cpk color") 
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; color group", "group color")
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; color amino", "amino color")
document.getElementById("third").innerHTML+=Jmol.jmolButton(jmolApplet0,"select * ; color structure", "structure color")

document.getElementById("fifth").innerHTML+=Jmol.jmolRadioGroup(jmolApplet1, [["set background white", "white", true],["set background black", "black"]])
document.getElementById("fifth").innerHTML+=Jmol.jmolBr(jmolApplet1)

document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim play", "play")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim off", "stop")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim off;anim rewind#;","First")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim off;frame prev", "Prev")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim off;frame next", "Next")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim off;frame last", "Last")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim off;frame all", "All")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1, "anim mode loop;frame 1;anim play", "loop")
document.getElementById("fifth").innerHTML+=Jmol.jmolBr(jmolApplet1)
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; cartoon only", "cartoon")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; wireframe -0.25", "stick")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; spacefill only;spacefill 23%;wireframe 0.15","ball&stick")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; spacefill","Van der Waals")
document.getElementById("fifth").innerHTML+=Jmol.jmolBr(jmolApplet1)
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; color cpk", "cpk color") 
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; color group", "group color")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; color amino", "amino color")
document.getElementById("fifth").innerHTML+=Jmol.jmolButton(jmolApplet1,"select * ; color structure", "structure color")

document.getElementById("Rotate").addEventListener("click", rotate_model);
document.getElementById("ResetView").addEventListener("click", reset_view)
//document.getElementById("Highlight segment").addEventListener("click", highlight)
document.getElementById("run_cmd").addEventListener("click", run_jmol_script);
document.getElementById("load2model").addEventListener("click", load_pdb);
document.getElementById("seqNumBtn").addEventListener("click", load_pdb);
document.getElementById("seqClrBtn").addEventListener("click", load_pdb);


};

//matlab -nodisplay -nojvm -r  "wrapper_loop_modeller2('1adg','LADH_loopmovement.pdb','A',290,301,[291 -90 ; 292 -110; 293 -64; 294 -90],[291 122; 292 -35; 293 147],[295 296],[294 295],10000);exit;"
    function setDefault(){
      pdbid='1adg'
      fname='LADH_loop_movement.pdb'
      chain='A'
      segb=290
      sege=301
      //291 -90 ; 292 -110; 293 -64; 294 -90]
      phitargs=[]
      phitargs.append([291,-90])
      phitargs.append([292, -110])
      phitargs.append([293, -64])
      phitargs.append([294, -90])
      //[291 122; 292 -35; 293 147]
      psitargs=[]
      psitargs.append([291, 122])
      psitargs.append([292, -35])
      psitargs.append([293 , 147])
      //[295 296]
      phiconstr=[295,  296]
      //[294 295]
      psiconstr=[294 , 295]

      itter=10000

      document.getElementById("pdbcode_input").value = pdbid
    }

    function load_pdb() {
        console.log("clicked" + jmolApplet0);
        var pdbCode = document.getElementById("pdbcode_input").value;
        Jmol.script(jmolApplet0, "load=" + pdbCode);
    }

    function rotate_model() {
      console.log("called rotate")
        Jmol.script(jmolApplet0, "rotate y 30");
    }

    function reset_view() {
        Jmol.script(jmolApplet0, "reset");
    }

    function highlight() {
        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;
        Jmol.script(
            jmolApplet0,
            "select " + start + "-" + end + "; color orange"
        );
    }


function run_jmol_script() {
        console.log("run jmol cmd")
        var cmd = document.getElementById("cmd_str").value;
        console.log("cmd" +cmd)
        if(left_crtl){
        Jmol.script(jmolApplet0, cmd);
        }else{
        Jmol.script(jmolApplet1, cmd);
        }
    }


function Sync(){
  if (document.getElementById("sync").checked == true){
    Jmol.script(jmolApplet0,'sync * on; sync * "set syncMouse true"')
  }else{
    Jmol.script(jmolApplet0,'sync * off')
  }
}

async function Load(){
  val = document.getElementById("load").value
  console.log(val)
  data = await getPdb(val)
  console.log(data)
  Jmol.script(jmolApplet0, "load "+data.redirectUrl)
}

var re = /BEG_\d+_END_\d+/;

var re1 = /seq \d+/;

async function load_from_server(event){
  console.log(event)
  parent=event.target.parentNode
  console.log(parent)
  console.log(parent.querySelectorAll('p'))
  
  fname=parent.querySelectorAll('p')[0].innerText

  //set the current loops begin / end string 
  result = fname.match(re)[0]
  result2 = result.replace('BEG','')
  result3 = result2.replace('END','')
  result4 = result3.replace('_','')
  result5 = result4.replace('__','-')
  result6 = result5.trim()
  current_loop=result6

  
  console.log(parent.querySelectorAll('p')[0].innerText)
  console.log(parent.querySelectorAll('p')[0].innerHTML)
  exsists=await check_file_exsists(fname)
  console.log("exsists")
  console.log(exsists)
  if(exsists == false){
    alert("server err that file doesn't exsist but is reference in the database")
  }else{
    Jmol.script(jmolApplet1, "load "+exsists)
  }
}
async function check_file_exsists(fname_){
  console.log("searching for "+fname_ )
  let res_= await fetch("http://localhost:5123/api/v1/pdbs/1", {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      fname : fname_
    })
  }).then(res_ => res_.text())
  return res_
}

async function Search(){
  query=document.getElementById("search_q").value
  query="http://localhost:5123/api/v1/pdbs/?pdbid="+query.toUpperCase()
  fetch(query)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    //document.getElementById("search_result").value = data
    resultDiv=document.getElementById("search_result")
    resultDiv.innerHTML=''
    
    for(var i=0;i<data.length;i++){
      innerDiv= document.createElement('div');
      console.log(data[i])
      a = document.createElement('a');
      p = document.createElement('p');
      p.style.display='none'
      p.textContent=data[i].fname  
      a.textContent = "Beg: "+ data[i].segbeg + " End: " + data[i].segend + " Targ φ: "+ data[i].target_residues_phi + " Targ ψ : "+ data[i].target_residues_psi + " Cnstr φ: "+ data[i].constr_residues_phi+ + " Cnstr ψ: "+ data[i].constr_residues_psi   
      a.onclick = load_from_server
      innerDiv.appendChild(a)
      innerDiv.appendChild(p)
      resultDiv.appendChild(innerDiv)
      resultDiv.append(document.createElement('br'))
    }
  })
  .catch(error => {
    console.error(error);
  });

}

function toggle_ctr1(){
   
      left_crtl = true
      document.getElementById("right window").checked = false;
      document.getElementById("left window").checked = true;
    
}
function toggle_ctr2(){
   
    left_crtl = false
    document.getElementById("left window").checked = false;
    document.getElementById("right window").checked = true;

}

function handleWindowSize(){
  
  w =Number( window.innerWidth)
  if(w<880){
    jmolApplet0._resizeApplet(400,400)
    jmolApplet1._resizeApplet(400,400)
    document.getElementById("left_label").textContent="up"
    document.getElementById("right_label").textContent="down"
  }else{
    jmolApplet0._resizeApplet(598,598)
    jmolApplet1._resizeApplet(598,598)
    document.getElementById("left_label").textContent="left"
    document.getElementById("right_label").textContent="right"
  }
}

function HighlightLoop(){
  if(!highted){
    highted=true
  Jmol.script(
    jmolApplet0,
    "select " +current_loop+ "; color lawngreen"
);
  }else{
    highted=false
    Jmol.script(
      jmolApplet0,
      "select * ; color cpk"
  );
  }

}

function get_torsion_angle(seqNum){

  phi= Jmol.getPropertyAsArray(jmolApplet0, "polymerInfo").models[0].polymers[0].monomers[seqNum].phi
  psi= Jmol.getPropertyAsArray(jmolApplet0, "polymerInfo").models[0].polymers[0].monomers[seqNum].psi
  //console.log("phi " +phi + " psi " + psi)
  return {"phi" : phi , "psi": psi}
}
function show_torsion(){
  num=document.getElementById('seqNum').value
  tors = get_torsion_angle(num)
  console.log(psi)
  outDiv=document.getElementById('search_result1')
  p = document.createElement('p');
  p.innerText=`seq ${num}, φ ${tors.phi.toFixed(8)}, ψ ${tors.psi.toFixed(8)}`
  p.onclick = hilight_sgl
  outDiv.appendChild(p)

}
function clear_torsion(){
  document.getElementById('search_result1').innerHTML=''
}
function hilight_sgl(event){
  text=event.target.innerText.match(re1)[0]
  text=text.replace("seq", "")
  text=text.trim()
  //console.log(text)
  Jmol.script(jmolApplet0, "select "+text+ "; color lawngreen")
}