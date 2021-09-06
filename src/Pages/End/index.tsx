import React, { useContext } from "react";
import "./index.scss";
import "../../Styles/Styles.scss";
import { useParams } from "react-router-dom";

interface PathType {
  type: string;
}

const Top: React.VFC = () => {
  let param = useParams<PathType>();
  return (
    <>
      <div className="End flex items-center justify-center flex-col h-full">
        <div className="End__title">{param.type}</div>
        <div className="End__staff mt-8">
          <div>開発　　　　　Ueda</div>
          <div>イラスト　　　Ueda</div>
          <div>ストーリー　　Ueda</div>
          <div>音楽　　　　　Ueda</div>
          <div className="mt-8">ソースは全て公開してます</div>
          <a
            className="End__github"
            target="_blank"
            href="https://github.com/uemegu/ReactPractice"
          >
            https://github.com/uemegu/ReactPractice
          </a>
        </div>
      </div>
    </>
  );
};

export default Top;
