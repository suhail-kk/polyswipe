'use client';

import JsonView from '@uiw/react-json-view';

interface JsonViewerProps {
  data: any;
  collapsed?: boolean;
}

export default function JsonViewer({ data, collapsed = false }: JsonViewerProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
      <JsonView
        value={data}
        collapsed={collapsed}
        style={{
          backgroundColor: 'transparent',
          fontSize: '14px',
        }}
      />
    </div>
  );
}