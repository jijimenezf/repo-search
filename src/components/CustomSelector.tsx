import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Selector = {
  label: string;
  byDefault: string | undefined;
  options: { value: string; label: string }[];
  onUpdate: (value: string) => void;
};

function CustomSelector({ label, options, onUpdate, byDefault }: Selector) {
  return (
    <Select onValueChange={onUpdate} defaultValue={byDefault}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select an option</SelectLabel>
          {options.map((option, index) => (
            <SelectItem key={`${option.value}-${index}`} value={option.value}>
              {`${label}  ${option.label}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CustomSelector;
