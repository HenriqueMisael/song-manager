import { Text, Colors } from '@blueprintjs/core';
import { memo } from 'react';

interface Props {
  name: string;
  average: number;
  lower: number;
  higher: number;
  min?: number;
  max?: number;
}

const AudioFeatureBar = memo<Props>(
  ({ average, lower, higher, name, min = 0, max = 1 }) => {
    return (
      <div title={name} className="m-0.5" style={{ background: Colors.BLACK }}>
        <div
          style={{
            width: `${Math.trunc(((higher - min) / (max - min)) * 100)}%`,
            background: Colors.LIME1,
          }}
        >
          <div
            style={{
              width: `${Math.trunc(((average - min) / (max - min)) * 100)}%`,
              background: Colors.TURQUOISE1,
            }}
          >
            <div
              style={{
                width: `${Math.trunc(((lower - min) / (max - min)) * 100)}%`,
                background: Colors.INDIGO1,
              }}
            >
              <Text className="text-[8px]">{name}</Text>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default AudioFeatureBar;
