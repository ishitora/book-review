import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';

import { CATEGORIES } from '@/constants/constant';

const CatelogyList = ({ total, categories }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)', { noSsr: true });

  if (isMobile) {
    return (
      <Accordion expanded={open} sx={{ backgroundColor: '#f8f8f8' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Typography>篩選</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#fff' }}>
          <List>
            {total > 0 && categories && (
              <ListItemButton
                selected={!router.query.catelogy}
                onClick={() => {
                  setOpen(false);
                  router.push({
                    pathname: '/search',
                    query: {
                      keyword: router.query.keyword,
                      p: 1,
                    },
                  });
                }}
                key={'all'}
              >
                全部結果({total})
              </ListItemButton>
            )}
            {Object.keys(categories).map((catelogy) => {
              return (
                <ListItemButton
                  selected={
                    decodeURI(
                      typeof router.query.catelogy === 'string'
                        ? router.query.catelogy
                        : ''
                    ).replace('%26', '&') === catelogy
                  }
                  onClick={() => {
                    setOpen(false);
                    router.push({
                      pathname: '/search',
                      query: {
                        ...router.query,
                        p: 1,
                        catelogy: encodeURI(catelogy.replace('&', '%26')),
                      },
                    });
                  }}
                  key={catelogy}
                >
                  {CATEGORIES[catelogy] || catelogy}({categories[catelogy]})
                </ListItemButton>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <List
      subheader={
        <ListSubheader
          disableSticky
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
          }}
        >
          篩選
        </ListSubheader>
      }
    >
      {total > 0 && categories && (
        <ListItemButton
          selected={!router.query.catelogy}
          onClick={() => {
            router.push({
              pathname: '/search',
              query: {
                keyword: router.query.keyword,
                p: 1,
              },
            });
          }}
          key={'all'}
        >
          全部結果({total})
        </ListItemButton>
      )}
      {Object.keys(categories).map((catelogy) => {
        return (
          <ListItemButton
            selected={
              decodeURI(
                typeof router.query.catelogy === 'string'
                  ? router.query.catelogy
                  : ''
              ).replace('%26', '&') === catelogy
            }
            onClick={() => {
              router.push({
                pathname: '/search',
                query: {
                  ...router.query,
                  p: 1,
                  catelogy: encodeURI(catelogy.replace('&', '%26')),
                },
              });
            }}
            key={catelogy}
          >
            {CATEGORIES[catelogy] || catelogy}({categories[catelogy]})
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default CatelogyList;
