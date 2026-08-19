import Image from "next/image";
import styles from "../../app/page.module.css";

export default function OverlapCard() {
  return (
    <>
      <div className={styles.cardTopSplit}>
        <div className={styles.cardTopLeft}>
          <span className={styles.accentTag}>- 0.0</span>
          <h2>Sweet Moments<br/><span className="text-italic">Delivery Here</span></h2>
          <div className="fine-line"></div>
          <p>Treating you correctly because every detail matters. Hand-crafted artisanal cakes delivered perfectly to your door.</p>
          <button className="btn">Shop Collection</button>
        </div>
        <div className={styles.cardTopRight}>
           <div className={`${styles.sliceImgContainer} glass-border`}>
              <Image 
                src="/cakes/cake-2.png" 
                alt="Cake Slice" 
                layout="fill" 
                objectFit="cover" 
                className={styles.sliceImg}
              />
           </div>
        </div>
      </div>

      <div className={styles.infoBlocksRow}>
        <div className={`${styles.infoBlock} ${styles.infoBlockActive} glass-border`}>
          <h4>Fresh Ingredients</h4>
          <p>We source only the finest local ingredients for a truly premium taste.</p>
        </div>
        <div className={`${styles.infoBlock} glass-border`}>
          <h4>Hand Crafted</h4>
          <p>Every cake is uniquely designed and beautifully put together.</p>
        </div>
        <div className={`${styles.infoBlock} glass-border`}>
          <h4>Daily Batches</h4>
          <p>Baked fresh every single morning to ensure perfect texture and moisture.</p>
        </div>
      </div>
    </>
  );
}
