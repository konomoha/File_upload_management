<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\All;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotBlank;

class FileUploadType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('fileUpload', FileType::class, [
                'label' => "Ajoutez un fichier",
                'mapped' =>true,
                'data_class'=>null,
                'multiple'=>true,
                'required' => false,
                'constraints'=>[
                    new All([
                        'constraints' => [
                            new File([
                                'maxSize' => '5M',
                                'mimeTypes' => [
                                    'application/pdf',
                                    'text/plain'
                                ],
                                'mimeTypesMessage' => 'Formats autorisés : pdf/txt, Taille maximale : 5Mo'
                            ]),
                        ]
                    ]),
                    new NotBlank([
                        'message'=>"Veuillez sélectionner un fichier."
                    ])
                ]
            ]);
    }   

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
