import { FC, MouseEventHandler } from 'react';

import { Accordion, Card, Group, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { FieldType } from 'shared/api/collections/types';
import { typesIcon } from 'shared/constants/collections/types-icons';

type PropsType = {
  itemFields: FieldType[];
};

export const ItemsFieldsAccordion: FC<PropsType> = ({ itemFields }) => {
  const { t } = useTranslation();

  const stopPropagationHandler: MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = e => {
    e.stopPropagation();
  };

  return (
    <Card.Section p={0} withBorder>
      <Accordion variant="filled" radius="xs">
        <Accordion.Item value="kek">
          <Accordion.Control p="xs" onClick={stopPropagationHandler}>
            <Text weight={500} size="sm">
              {t('accordion_text_additionalInfo')}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack spacing={3}>
              {itemFields.map(field => (
                <Group key={field.title} align="center">
                  <Group>
                    {typesIcon[`${field.type}`]}
                    <Text size="sm">{field.title}</Text>
                  </Group>
                </Group>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card.Section>
  );
};
