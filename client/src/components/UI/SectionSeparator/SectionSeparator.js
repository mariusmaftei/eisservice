import styles from "./SectionSeparator.module.css";

export default function SectionSeparator() {
  return (
    <div className={styles.separator}>
      <div className={styles.bord}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 790 76"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlSpace="preserve"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: "1.41421",
          }}
        >
          <defs>
            <linearGradient
              id="_Linear1"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(789.248,0,0,363.056,1.69642e-13,23.4927)"
            >
              <stop
                id="header-stop1"
                offset="0"
                style={{ stopColor: "#153f7c", stopOpacity: "1" }}
              />
              <stop
                id="header-stop2"
                offset="0.5"
                style={{ stopColor: "#184990", stopOpacity: "1" }}
              />
              <stop
                id="header-stop3"
                offset="1"
                style={{ stopColor: "#2267cb", stopOpacity: "1" }}
              />
            </linearGradient>
            <linearGradient
              id="_Linear2"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(789.248,0,0,-93.7168,1.13687e-13,43.8523)"
            >
              <stop
                offset="0"
                style={{ stopColor: "#247fff", stopOpacity: "1" }}
              />
              <stop
                offset="1"
                style={{ stopColor: "#247fff", stopOpacity: "1" }}
              />
            </linearGradient>
            <linearGradient
              id="_Linear3"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(-789.248,0,0,93.7168,789.248,43.8523)"
            >
              <stop
                offset="0"
                style={{ stopColor: "#5688c7", stopOpacity: "1" }}
              />
              <stop
                offset="1"
                style={{ stopColor: "#0b1425", stopOpacity: "1" }}
              />
            </linearGradient>
            <clipPath id="_clip4">
              <rect
                x="0"
                y="30.129"
                width="789.248"
                height="16.03"
                clipRule="nonzero"
              />
            </clipPath>
          </defs>

          <g>
            <rect
              x="0"
              y="0"
              width="789.248"
              height="75.858"
              style={{ fill: "none" }}
            />
            {/* Top curved wave */}
            <path
              id="topfill--Curve-"
              d="M0,20c100,-15 200,-10 300,0c100,10 200,15 300,0c100,-15 189.248,-10 189.248,0l0,55.858l-789.248,0l0,-55.858Z"
              style={{ fill: "url(#_Linear1)" }}
            />
          </g>

          <g>
            {/* Middle wave */}
            <path
              d="M0,40c150,-20 300,-15 450,0c150,15 300,20 339.248,0l0,35.858l-789.248,0l0,-35.858Z"
              style={{ fill: "url(#_Linear2)", fillRule: "nonzero" }}
            />
          </g>

          <g id="hard-line-bottom--Group---Group-">
            {/* Bottom curved wave */}
            <path
              id="hard-line-bottom"
              d="M0,50c200,-25 400,-20 600,0c200,20 189.248,25 189.248,0l0,25.858l-789.248,0l0,-25.858Z"
              style={{ fill: "#dddfe1", fillRule: "nonzero" }}
            />
          </g>

          <g>
            {/* Bottom accent wave */}
            <path
              d="M0,55c250,-30 500,-25 750,0c39.248,25 39.248,20.858 39.248,20.858l-789.248,0l0,-20.858Z"
              style={{ fill: "url(#_Linear3)", fillRule: "nonzero" }}
            />
          </g>

          <g>
            <g opacity="0.619995">
              <g clipPath="url(#_clip4)">
                {/* Subtle overlay wave */}
                <path
                  d="M0,30c100,-10 200,-8 300,0c100,8 200,10 189.248,0l0,16.03l-789.248,0l0,-16.03Z"
                  style={{ fill: "#247fff", fillRule: "nonzero" }}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
