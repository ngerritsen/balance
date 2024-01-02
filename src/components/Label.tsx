type Props = {
  children: string;
};

const Label = (props: Props) => {
  return <label class="font-medium mb-1 block text-sm">{props.children}</label>;
};

export default Label;
