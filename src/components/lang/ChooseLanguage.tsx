import { Button, Dropdown, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'



export const ChooseLanguage = () => {
  const [lang, setlang] = useState('')
  const { t } = useTranslation()
  const langSelector: ItemType[] = ['en', 'vi'].map(el => (
    {
      key: el,
      label: (
        <div onClick={()=> handleChangeLanguage(el)}>
          {el}
        </div>
      )
    }
  ))
  const menu = (
    <Menu items={langSelector} />
  );

  const handleChangeLanguage = (lang: string) => {
    let currentLang = i18n.language
    if (currentLang !== lang) {
      i18n.changeLanguage(lang)
      setlang(i18n.language)
    }
  }
  useEffect(() => {
    let lang = i18n.language || localStorage.getItem('i18nextLng')
    if (!lang) {
      lang = 'en'
      i18n.changeLanguage('en')
    }
    setlang(lang)
  }, [])
  
  return (
    <div>
      <Dropdown overlay={menu}>
        {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}> */}
        <Button>
          Current lang: {lang}
        </Button>
        {/* </a> */}
      </Dropdown>
      {t('test.hello')}
    </div>
  )
}
