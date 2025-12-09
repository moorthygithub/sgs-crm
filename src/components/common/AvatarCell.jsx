// import { Avatar, Spin, Image } from "antd";
// import { useState, useMemo } from "react";

// const AvatarCell = ({ imageSrc, size = 40, shape = "circle" }) => {
//   const [loading, setLoading] = useState(true);

//   const avatarUrl = useMemo(() => {
//     if (!imageSrc) return null;
//     const isRemote = imageSrc.startsWith("http");
//     return isRemote
//       ? `${imageSrc}?rnd=${Math.floor(Math.random() * 1000000)}`
//       : imageSrc;
//   }, [imageSrc]);

//   if (!avatarUrl) return null;
//   return (
//     <div
//       className="flex justify-center items-center"
//       style={{ width: 40, height: 40 }}
//     >
//       {loading && <Spin size="small" />}
//       <Avatar
//         size={size}
//         shape={shape}
//         style={loading ? { display: "none" } : {}}
//         src={
//           <Image
//             src={avatarUrl}
//             preview={false}
//             onLoad={() => setLoading(false)}
//             onError={() => setLoading(false)}
//           />
//         }
//       />
//     </div>
//   );
// };

// export default AvatarCell;
import { Avatar, Spin, Image } from "antd";
import { useState, useMemo } from "react";

const AvatarCell = ({ imageSrc, size = 40, shape = "square" }) => {
  const [loading, setLoading] = useState(true);

  const avatarUrl = useMemo(() => {
    if (!imageSrc) return null;
    const isRemote = imageSrc.startsWith("http");
    return isRemote
      ? `${imageSrc}?rnd=${Math.floor(Math.random() * 1000000)}`
      : imageSrc;
  }, [imageSrc]);

  if (!avatarUrl) return null;

  return (
    <div className="flex justify-center items-center">
      {loading && <Spin size="small" />}
      <Avatar
        size={size}
        shape={shape}
        style={loading ? { display: "none" } : {}}
        src={
          <Image
            src={avatarUrl}
            preview={false}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        }
      />
    </div>
  );
};

export default AvatarCell;
