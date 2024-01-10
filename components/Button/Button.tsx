export const GhostButton: any = ({ style, children }: any) => {
  return (
    <button style={style} className='ghost-btn roboto_700'>
      {children}
    </button>
  );
};
export const ContainedButton: any = ({ style, children }: any) => {
  return (
    <button style={style} className='contained-btn roboto_700'>
      {children}
    </button>
  );
};

export const GhostButtonSm = ({ style, children }: any) => {
  return (
    <button style={style} className='ghost-btn ghost-btn--sm roboto_700'>
      {children}
    </button>
  );
};
export const ContainedButtonSm = ({ style, children }: any) => {
  return (
    <button style={style} className='contained-btn contained-btn--sm roboto_700'>
      {children}
    </button>
  );
};
