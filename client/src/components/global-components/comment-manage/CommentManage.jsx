import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { useMenuItem } from '@mui/base/useMenuItem';
import { Popper } from '@mui/base/Popper';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import { useMenuButton } from '@mui/base/useMenuButton';
import { IoIosMore } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { TbMessageReply } from "react-icons/tb";
import { ShowOnLogin } from '../../../protect/HiddenLink';

const Menu = React.forwardRef(function Menu(props, ref) {
  const { children, colors, ...other } = props;

  const { open, triggerElement, contextValue, getListboxProps } = useMenu({
    listboxRef: ref,
  });

  return (
    <Popper open={open} anchorEl={triggerElement}>
      <ul 
      style={{
            padding: "10px",
            backgroundColor: colors.grey[800],
        }} className="menu-root flex flex-col justify-center items-center" {...other} {...getListboxProps()}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </ul>
    </Popper>
  );
});

Menu.propTypes = {
  children: PropTypes.node,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { children, onClick, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({ rootRef: ref });

  const classes = {
    'focus-visible': focusVisible,
    'menu-item': true,
    disabled,
  };

  return (
    <li
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => {}) })}
      className={clsx(classes)}
    >
      {children}
    </li>
  );
});

MenuItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const MenuButton = React.forwardRef(function MenuButton(props, forwardedRef) {
  const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

  return (
    <button type="button" {...props} {...getButtonProps()} className="button" />
  );
});

export default function CommentManage(
    {colors,
    editMode,
    ItemComment,
    handleEditComment,
    handleDeleteComment,
    toggleReplyVisibility,
    t,
    replyVisible,
   }) {
  const { contextValue: dropdownContextValue } = useDropdown();


  return (
    <React.Fragment>
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton><IoIosMore /></MenuButton>
        <Menu colors={colors} id="hooks-menu">
            {/* Edit and Delete Buttons */}
            <MenuItem>
            {/* Reply Button */}
            <button className='btn my-2 mx-2' onClick={() => toggleReplyVisibility(ItemComment._id)}>
                {replyVisible[ItemComment._id] ? <MdCancel color="red" size={15} />
                :
                <span className='flex flex-row items-center'>
                    <TbMessageReply size={15} />
                    {t("reply")}
                </span>
                }
            </button>
            </MenuItem>
            {/* Edit Button */}
            <ShowOnLogin>
                <MenuItem>
                    <button className='btn my-2' onClick={() => handleEditComment(ItemComment._id)}>
                        {editMode[ItemComment._id] ? <MdCancel color="red" size={15} /> 
                        : 
                        <span className='flex flex-row items-center'>
                            <BiEdit color="green" size={15} />
                            {t("edit")}
                        </span>
                    }
                    </button>
                </MenuItem>
            </ShowOnLogin>
            {/* Delete Button */}
            <ShowOnLogin>    
                <MenuItem>
                    <button className='btn my-2 flex flex-row items-center' onClick={() => handleDeleteComment(ItemComment._id)}>
                        <MdDeleteForever color="red" size={15} />
                        {t("delete")}
                    </button>
                </MenuItem>
            </ShowOnLogin>
        </Menu>
      </DropdownContext.Provider>
    </React.Fragment>
  );
}