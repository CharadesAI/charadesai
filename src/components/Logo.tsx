export default function Logo() {
  return (
    // Logo of CharadesAI this should not be copiable or draggable
    <img
      src='assets/logo.webp'
      alt='CharadesAI Logo'
      className='h-full w-auto'
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onAuxClick={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
