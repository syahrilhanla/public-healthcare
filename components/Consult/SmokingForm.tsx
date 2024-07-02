import ControlledInput from "components/ControlledInput";
import RadioButtons from "components/RadioButtons";
import SelectSmokingReason from "components/Consult/SelectSmokingReason";

import { ConsultFormType } from "type/consult.type";

interface SmokingFormProps {
  form: ConsultFormType;
}

const SmokingForm: React.FC<SmokingFormProps> = ({ form }) => {
  return (
    <>
      <RadioButtons
        formSchema={form}
        inputId="hasSmoke"
        includeError
        labelText="Apakah kamu pernah merokok walau satu hisapan?"
        options={[
          {
            value: "YES",
            label: "Pernah"
          },
          {
            value: "NO",
            label: "Tidak Pernah"
          }
        ]}
      />

      {
        form.watch("hasSmoke") === "YES" ? (
          <>
            <ControlledInput
              formSchema={form}
              inputId="ageStartSmoking"
              includeError
              labelText="Berapa usia kamu mulai merokok?"
              placeholder="e.g. 12 tahun"
            />

            <SelectSmokingReason form={form} />

            <ControlledInput
              formSchema={form}
              inputId="smokingSource"
              includeError
              labelText="Dari mana kamu tahu tentang merokok?"
              placeholder="e.g. teman, keluarga, iklan, dll"
            />

            <ControlledInput
              formSchema={form}
              inputId="cigaretteCount"
              includeError
              labelText="Berapa jumlah batang rokok yang kamu hisap setiap hari?"
              placeholder="e.g. teman, keluarga, iklan, dll"
            />
          </>
        ) : form.watch("hasSmoke") === "NO" && (
          <>
            <RadioButtons
              formSchema={form}
              inputId="knowledgeOfSmokingEffect"
              includeError
              labelText="Apakah kamu tahu dampak buruk dari merokok?"
              options={[
                {
                  value: "YES",
                  label: "Tahu"
                },
                {
                  value: "NO",
                  label: "Tidak Tahu"
                }
              ]}
            />

            <RadioButtons
              formSchema={form}
              inputId="wantingToQuit"
              includeError
              labelText="Apakah kamu ada keinginan untuk berhenti merokok?"
              options={[
                {
                  value: "YES",
                  label: "Ingin"
                },
                {
                  value: "NO",
                  label: "Tidak Ingin"
                }
              ]}
            />

            <ControlledInput
              formSchema={form}
              inputId="reasonToQuit"
              includeError
              labelText="Apa alasanmu ingin berhenti merokok?"
            />

            <ControlledInput
              formSchema={form}
              inputId="quitSupport"
              includeError
              labelText="Siapa yang mendukungmu berhenti merokok?"
              placeholder="e.g. keluarga, teman, dll"
            />
          </>
        )
      }
    </>
  )
}

export default SmokingForm;