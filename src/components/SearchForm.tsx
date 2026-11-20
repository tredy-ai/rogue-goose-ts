"use client";

import type { SubmitEvent } from "react";
import {
  ANY_ALL,
  COUNTRY_OPTIONS,
  FORM_FIELDS,
  ORBIT_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/form-options";

type Props = {
  onSubmit: (data: FormData) => void;
  pending: boolean;
};

const CONTROL = "border border-gray-400 rounded px-2 py-1";
const FIELD_CLASSNAME = "col-span-2 grid grid-cols-subgrid items-center";

export function SearchForm({ onSubmit, pending }: Props) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 max-w-md">
      <div className={FIELD_CLASSNAME}>
        <label htmlFor={FORM_FIELDS.searchText}>Search</label>
        <input
          type="text"
          id={FORM_FIELDS.searchText}
          name={FORM_FIELDS.searchText}
          placeholder="Name, NORAD ID, etc..."
          className={CONTROL}
        />
      </div>
      <div className={FIELD_CLASSNAME}>
        <label htmlFor={FORM_FIELDS.howMany}>Max results</label>
        <input
          type="text"
          id={FORM_FIELDS.howMany}
          name={FORM_FIELDS.howMany}
          placeholder="20"
          className={CONTROL}
        />
      </div>
      <div className={FIELD_CLASSNAME}>
        <label htmlFor={FORM_FIELDS.nation}>Country</label>
        <select
          id={FORM_FIELDS.nation}
          name={FORM_FIELDS.nation}
          defaultValue={ANY_ALL}
          className={CONTROL}
        >
          <option value={ANY_ALL}>{ANY_ALL}</option>
          {COUNTRY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={FIELD_CLASSNAME}>
        <label htmlFor={FORM_FIELDS.orbitRegime}>Orbit</label>
        <select
          id={FORM_FIELDS.orbitRegime}
          name={FORM_FIELDS.orbitRegime}
          defaultValue={ANY_ALL}
          className={CONTROL}
        >
          <option value={ANY_ALL}>{ANY_ALL}</option>
          {ORBIT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={FIELD_CLASSNAME}>
        <label htmlFor={FORM_FIELDS.missionStatus}>Status (required)</label>
        <select
          id={FORM_FIELDS.missionStatus}
          name={FORM_FIELDS.missionStatus}
          defaultValue=""
          className={CONTROL}
        >
          <option value="">Select a status…</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="button-primary col-span-2 justify-self-center w-2/3 px-4 py-2 disabled:opacity-50"
      >
        {pending ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
