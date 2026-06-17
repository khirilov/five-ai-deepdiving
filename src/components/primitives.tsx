import type { ReactNode } from "react";

export function SlideTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <header className="slide-header">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h2>{children}</h2>
    </header>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="bullets">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Cols({ children }: { children: ReactNode }) {
  return <div className="cols">{children}</div>;
}

export function Col({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div className="col">
      {title ? <h3 className="col-title">{title}</h3> : null}
      {children}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">💡 {children}</p>;
}

export function Warn({ children }: { children: ReactNode }) {
  return <p className="note warn">⚠️ {children}</p>;
}

export function Term({ children }: { children: ReactNode }) {
  return <code className="term">{children}</code>;
}

type FieldRow = { field: ReactNode; meaning: ReactNode };

export function FieldTable({ rows, headers }: { rows: FieldRow[]; headers?: [string, string] }) {
  return (
    <table className="field-table">
      {headers ? (
        <thead>
          <tr>
            <th>{headers[0]}</th>
            <th>{headers[1]}</th>
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="field-name">{row.field}</td>
            <td>{row.meaning}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Flow({ steps }: { steps: ReactNode[] }) {
  return (
    <div className="flow">
      {steps.map((step, i) => (
        <span key={i} className="flow-item">
          <span className="flow-step">{step}</span>
          {i < steps.length - 1 ? <span className="flow-arrow">→</span> : null}
        </span>
      ))}
    </div>
  );
}

export function BigStatement({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="big-statement">
      <p className="statement">{children}</p>
      {sub ? <p className="statement-sub">{sub}</p> : null}
    </div>
  );
}
