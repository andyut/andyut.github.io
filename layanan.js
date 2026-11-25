(function(){
  var items=[].slice.call(document.querySelectorAll('.gal a[data-full], .flyer-gal a.flyer-thumb[data-full]'));
  if(!items.length) return;
  var box=document.createElement('div');
  box.className='lb';
  box.setAttribute('role','dialog');
  box.setAttribute('aria-modal','true');
  box.setAttribute('aria-label','Pratinjau gambar');
  box.innerHTML='<button type="button" class="lbx" aria-label="Tutup">×</button>'
    +'<button type="button" class="lbp" aria-label="Sebelumnya">‹</button>'
    +'<img alt="">'
    +'<button type="button" class="lbn" aria-label="Berikutnya">›</button>'
    +'<p class="lbcaption"></p>';
  document.body.appendChild(box);
  var img=box.querySelector('img'), cap=box.querySelector('.lbcaption'), i=0;
  function open(n){
    i=(n+items.length)%items.length;
    var a=items[i];
    img.src=a.getAttribute('data-full');
    img.alt=a.getAttribute('data-alt')||'';
    cap.textContent=a.getAttribute('data-caption')||'';
    box.classList.add('open');
    document.body.classList.add('lb-on');
    box.querySelector('.lbx').focus();
  }
  function close(){box.classList.remove('open');document.body.classList.remove('lb-on');img.removeAttribute('src');}
  items.forEach(function(a,idx){a.addEventListener('click',function(e){e.preventDefault();open(idx);});});
  box.querySelector('.lbx').addEventListener('click',close);
  box.querySelector('.lbp').addEventListener('click',function(){open(i-1);});
  box.querySelector('.lbn').addEventListener('click',function(){open(i+1);});
  box.addEventListener('click',function(e){if(e.target===box)close();});
  document.addEventListener('keydown',function(e){
    if(!box.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowRight')open(i+1);
    if(e.key==='ArrowLeft')open(i-1);
  });
})();

