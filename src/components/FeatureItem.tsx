interface FeatureItemProps {
  text: string;
  iconSvg: string;
}

const FeatureItem = ({ text, iconSvg }: FeatureItemProps) => {
  return (
    <li className="flex items-start gap-3">
      <img src={iconSvg} alt="Ícone" className="w-6 h-6" />
      <p className="text-base leading-[24px]">{text}</p>
    </li>
  );
};

export default FeatureItem; 