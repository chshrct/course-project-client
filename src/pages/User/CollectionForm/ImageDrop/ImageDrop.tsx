/* eslint-disable no-magic-numbers */
import { FC } from 'react';

import { ActionIcon, Group, Image, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

import s from './style/ImageDrop.module.css';

type PropsType = Partial<DropzoneProps> & {
  image: File | null | string;
  setImage: (images: File[] | null) => void;
};

export const ImageDrop: FC<PropsType> = ({ image, setImage, ...props }) => {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  return (
    <>
      <Dropzone
        mt="md"
        onDrop={setImage}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
        p={0}
        {...props}
      >
        <Group position="center" className={`${s.height200} ${s.pointerEventsNone}`}>
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <Group position="center" className={s.height200}>
              {image ? (
                <Image
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  height={200}
                  width={300}
                  fit="cover"
                />
              ) : (
                <>
                  <IconPhoto size={50} stroke={1.5} />
                  <Text size="md" inline pl="md" pr="md" align="center">
                    {t('imageDrop_text')}
                  </Text>
                </>
              )}
            </Group>
          </Dropzone.Idle>
        </Group>
      </Dropzone>
      {image && (
        <Group mt="xs" position="right">
          <ActionIcon
            variant="default"
            onClick={() => {
              setImage(null);
            }}
            title="gamarjoba"
            size={30}
            mb={3}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      )}
    </>
  );
};
