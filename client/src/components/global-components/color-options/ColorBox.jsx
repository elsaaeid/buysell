import React from 'react'

export const ColorBox = ({
    itemColor,
    itemClass,
    itemClick,
}) => {
  return (
        <div 
            className={itemClass}
            onClick={itemClick}
            style={{
              background: itemColor,
          }}
            >
        </div>
  )
}
