export default function GenderCheckbox({ onChangeGender, selectedGender }) {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
        </label>
        <input
          type="checkbox"
          className="checkbox border-slate-900"
          value={selectedGender}
          onChange={() => onChangeGender("male")}
          checked={selectedGender === "male"}
        />
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
        </label>
        <input
          type="checkbox"
          className="checkbox border-slate-900"
          checked={selectedGender === "female"}
          onChange={() => onChangeGender("female")}
        />
      </div>
    </div>
  );
}
