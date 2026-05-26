/**
 * Table — an ascii data table.
 * columns: [{ key, header, align, render }]  render(row) for custom cells
 * data:    array of row objects
 */
export function Table({
  columns = [],
  data = [],
  caption,
  dense = false,
  className = '',
  ...rest
}) {
  return (
    <div className={['tm-table-wrap', className].filter(Boolean).join(' ')}>
      <table
        className={['tm-table', dense && 'tm-table--dense'].filter(Boolean).join(' ')}
        {...rest}
      >
        {caption && <caption className="tm-table__cap">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                style={c.align ? { textAlign: c.align } : undefined}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((c) => (
                <td key={c.key} style={c.align ? { textAlign: c.align } : undefined}>
                  {typeof c.render === 'function' ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="tm-table__empty" colSpan={columns.length || 1}>
                no rows returned
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
