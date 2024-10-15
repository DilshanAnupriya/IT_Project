import Spinner from "react-bootstrap/Spinner";
import styles from "../../Pages/Css/ComponentsCss/New_Dashboard/Dash.css";

export default function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner
        className={styles.spinner}
        animation="grow"
        size="sm"
        variant="info"
      />
      <Spinner
        className={styles.spinner}
        animation="grow"
        size="sm"
        variant="info"
      />
      <Spinner
        className={styles.spinner}
        animation="grow"
        size="sm"
        variant="info"
      />
      <Spinner
        className={styles.spinner}
        animation="grow"
        size="sm"
        variant="info"
      />
      <Spinner
        className={styles.spinner}
        animation="grow"
        size="sm"
        variant="info"
      />
    </div>
    );
}