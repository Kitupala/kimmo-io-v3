import { useThree } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";

function ThreeHeroImage({ src }: { src: string }) {
  const { viewport } = useThree();

  return (
    <group>
      <DreiImage
        url={src}
        position={[0, 0, 0]}
        scale={[viewport.width, viewport.height]}
        transparent
        opacity={1}
      />
    </group>
  );
}

export default ThreeHeroImage;
