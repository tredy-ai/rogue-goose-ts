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

export function SearchForm({ onSubmit, pending }: Props) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          Search{" "}
          <input
            type="text"
            name={FORM_FIELDS.searchText}
            placeholder="Name, NORAD ID, COSPAR ID, operator…"
          />
        </label>
      </p>
      <p>
        <label>
          Max results <input type="text" name={FORM_FIELDS.howMany} placeholder="20" />
        </label>
      </p>
      <p>
        <label>
          Country{" "}
          <select name={FORM_FIELDS.nation} defaultValue={ANY_ALL}>
            <option value={ANY_ALL}>{ANY_ALL}</option>
            {COUNTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <label>
          Orbit{" "}
          <select name={FORM_FIELDS.orbitRegime} defaultValue={ANY_ALL}>
            <option value={ANY_ALL}>{ANY_ALL}</option>
            {ORBIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <label>
          Status (required){" "}
          <select name={FORM_FIELDS.missionStatus} defaultValue="">
            <option value="">Select a status…</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </p>
      <button type="submit" disabled={pending}>
        {pending ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
