const container = document.getElementById('draggable-window');
const head = container.querySelector('.head');
const shift = {};

head.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(e) {
  const rect = container.getBoundingClientRect();
  shift.x = e.pageX - rect.left;
  shift.y = e.pageY - rect.top;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  container.classList.add('shadow');
  container.style.top = rect.top + 'px';
  container.style.left = rect.left + 'px';
}

function handleMouseUp(e) {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseMove);
  container.classList.remove('shadow');
}

function handleMouseMove(e) {
  container.style.left = (e.pageX - shift.x) + 'px';
  container.style.top = (e.pageY - shift.y) + 'px';
}
