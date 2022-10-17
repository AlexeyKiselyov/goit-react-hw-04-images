import s from './Loader.module.css';
// =====================

export function Loader() {
  return (
    <div className={s.overlay}>
      <div className={s.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
