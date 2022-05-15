import styles from "./style.module.css";

const Spinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(31 29 31)",
        zIndex: "88888",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.globe}>
        <div className={styles.globe__sphere} />
        <div className={styles.globe__outer_shadow} />
        <div className={styles.globe__worldmap}>
          <div className={styles.globe__worldmap__back} />
          <div className={styles.globe__worldmap__front} />
        </div>
        <div className={styles.globe__inner_shadow} />
      </div>
    </div>
  );
};

export default Spinner;
